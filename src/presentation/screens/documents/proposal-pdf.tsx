import { Document, Page, View, Text, StyleSheet, pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useProposal } from '../../contexts/proposal';
import { db } from "../../utils/database-client";
import { Button } from '../../shared/button';
import { ArrowLeft } from 'lucide-react';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
    },
    section: {
        flexGrow: 1,
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    jsonKey: {
        fontWeight: 'bold',
    },
    jsonValue: {
        marginLeft: 10,
    },
    jsonBracket: {
        marginLeft: 0,
    },
    jsonEntry: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

const formatJson = (data: any, level = 1) => {
    const indent = '  '.repeat(level);

    if (typeof data === 'object' && data !== null) {
        const isArray = Array.isArray(data);
        const entries = isArray ? data : Object.entries(data);
        const openBracket = isArray ? '[' : '{';
        const closeBracket = isArray ? ']' : '}';

        return (
            <Text style={styles.jsonBracket}>
                {openBracket}{'\n'}
                {entries.map((entry, index) => (
                    <Text key={index} style={styles.jsonEntry}>
                        {isArray ? '' : <Text style={styles.jsonKey}>{`${indent}  "${entry[0]}": `}</Text>}
                        {typeof entry[1] === 'object' ? (
                            formatJson(entry[1], level + 1)
                        ) : (
                            <Text style={styles.jsonValue}>{JSON.stringify(entry[1])}</Text>
                        )}
                        {index < entries.length - 1 && ','}
                        {'\n'}
                    </Text>
                ))}
                {closeBracket}
            </Text>
        );
    } else {
        return <Text style={styles.jsonValue}>{JSON.stringify(data)}</Text>;
    }
};

interface MyDocProps {
    data: any
}

const MyDoc = ({ data }: MyDocProps) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    {data && formatJson(data)}
                </View>
            </Page>
        </Document>
    )
};


export const MyDocument = () => {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();

    const { handleId, handleData, data } = useProposal()

    const params: any = {};

    for (const entry of searchParams.entries()) {
        params[`${entry[0]}`] = entry[1]
    }

    const handleProposal = async (value: string) => {
        try {
            const resp = await db.fetchProposal(value)
            handleData(resp)
        } catch (error) {
            alert(error)
        }
    }

    const downloadPdf = async () => {
        const fileName = 'test.pdf';
        const blob = await pdf(<MyDoc data={data} />).toBlob();
        saveAs(blob, fileName);
    };

    useEffect(() => {
        if (params.id) {
            handleId(Number(params.id))
            handleProposal(params.id)
        }
    }, [])

    return (

        <>
            <Button variant="ghost" className="absolute top-12 left-8 text-xs uppercase font-medium text-orange-500 flex items-center space-x-2" onClick={() => navigate('/home')}>
                <ArrowLeft size={14} />
                <span>voltar</span>
            </Button>

            <div className="flex flex-col justify-center items-center py-12 px-4">
                <div className="flex flex-col space-y-2 items-center justify-center">
                    <div className="flex flex-col space-y-4 mb-6">
                        <h2 className="text-2xl font-bold">Proposta</h2>
                    </div>

                    <MyDoc data={data} />
                    <Button onClick={downloadPdf}>Download PDF</Button>
                </div>
            </div>
        </>
    );
}