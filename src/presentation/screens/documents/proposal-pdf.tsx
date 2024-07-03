import { Document, Page, View, Text, StyleSheet, pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const MyDoc = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>PRIMEIR PDF</Text>
                <Text>PRIMEIR PDF</Text>
                <Text>PRIMEIR PDF</Text>
                <Text>PRIMEIR PDF</Text>
            </View>
        </Page>
    </Document>
);


export const MyDocument = () => {
    const downloadPdf = async () => {
        const fileName = 'test.pdf';
        const blob = await pdf(<MyDoc />).toBlob();
        saveAs(blob, fileName);
    };

    return (
        <div className='flex flex-col'>
            <MyDoc />
            <button onClick={downloadPdf}>Download PDF</button>
        </div>
    );
}