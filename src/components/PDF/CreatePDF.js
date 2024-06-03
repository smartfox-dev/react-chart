import { PDFViewer, Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useLocation, useParams } from 'react-router-dom/dist';



export const data = [
  { value: 25, label: 'Defects' },
  { value: 80, label: 'Output' },
];

export const size = {
  width: 700,
  height: 500,
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}


const CreatePDF = () => {
  const query = useQuery();
  const output = query.get("output");
  const defects = query.get("defects");
  const percentage = query.get("percentage");
  const capturedImage = query.get("capturedImage");
  console.log("-----------------output---------", output, defects, percentage, capturedImage)
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
            <Text style={styles.title}>Production Data for Machine 1</Text>
            <View style={styles.table}>
              <View style={styles.section}>
                <View style={styles.cell}><Text style={styles.textBold}>Total Output</Text></View>
                <View style={styles.cell}><Text style={styles.textBold}>Total Defects</Text></View>
                <View style={styles.cell}><Text style={styles.textBold}>Average Defect Percentage</Text></View>
              </View>
              <View style={styles.section}>
                <View style={styles.cell}><Text style={styles.text}>{output}</Text></View>
                <View style={styles.cell}><Text style={styles.text}>{defects}</Text></View>
                <View style={styles.cell}><Text style={styles.text}>{percentage}</Text></View>
              </View>
            </View>
            {capturedImage &&
              <View style={styles.imageContainer}>
                <Image src={capturedImage} style={styles.image} />
              </View>
            }
          </View>
        </Page>
      </Document>
    </PDFViewer >
  );
}

const styles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '100vh',
  },
  page: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the content horizontally
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',
    textAlign: 'center',
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  section: {
    width: '50%',
    marginBottom: 10,
  },
  cell: {
    padding: 5,
    border: '1px solid black',
  },
  textBold: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold'
  },
  text: {
    textAlign: 'center',
    fontSize: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20
  },
  imageContainer: {
    marginTop: 50,
  },
  image: {
    width: 400,
    height: 250,
  },
});

export default CreatePDF;