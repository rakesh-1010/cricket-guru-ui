import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Table, TableCell, TableBody, DataTableCell, TableHeader } from '@david.kucsai/react-pdf-table';
import { Row } from 'antd';

const styles = StyleSheet.create({
    page: {
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      width: '50%'
  },
  fullSection: {
      margin: 5,
      padding: 5,
      flexGrow: 1,
    },
    title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  
    
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },

  });

const InvoiceTemplate = ({currentPlayer}) => {
    return(
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text>Invoice</Text>
            <Text>VDR Cricket Academy</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
            <View style={styles.section}>
              <Text>{currentPlayer.name}</Text>
              <Text>
                Eco Haya
                #944/945, 4th Cross, 9th Main,
                Vijaya Bank Layout,
                Bannerghatta Road,
                Bangalore - 560076
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                Invoice # :	1
                Invoice Date :	10-01-2018
                Due Date :	10-01-2018
              </Text>
            </View>
          </View>
          <View style={[styles.fullSection, {flexDirection: 'row', justifyContent: 'flex-start'}]}>
             <Table
                    data={[
                        {firstName: "Cricket Coaching", lastName: "Cricket skills traniing and macthc practise", dob: "1 month", country: "1200", phoneNumber: "1200 /-"}
                    ]}
            >
                    <TableHeader>
                        <TableCell>
                            Items
                        </TableCell>
                        <TableCell>
                            Description
                        </TableCell>
                        <TableCell>
                            Duration
                        </TableCell>
                        <TableCell>
                            Price
                        </TableCell>
                        <TableCell>
                            Total
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell getContent={(r) => r.firstName}/>
                        <DataTableCell getContent={(r) => r.lastName}/>
                        <DataTableCell getContent={(r) => r.dob.toLocaleString()}/>
                        <DataTableCell getContent={(r) => r.country}/>
                        <DataTableCell getContent={(r) => r.phoneNumber}/>
                    </TableBody>
                </Table>
          </View>
          <View  style={[styles.section, {flexDirection: 'row', justifyContent: 'flex-start'}]}>
            <Text>
              Bill To: VDR Cricket Academy
              Bannerghatt Road,
              Bangalore - 560076
            </Text>
          </View>
        </Page>
      </Document>
    )
}

export default InvoiceTemplate;