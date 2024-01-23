import React, { useState, useEffect } from 'react'
import './App.css'

//Importing AntD button component
import { Button } from 'antd';
//Importing Axios for http request handeling
import axios from 'axios';

function App() {

    //Set endpoint as constant
    const pdfEndpoint = 'https://localhost:7187/api/my-pdf';

    //Function to call api endpoint by just setting the window.location.href to the pdf download endpoint
    const handleDownload = async () => {
      try {
        // Set window.location.href to initiate the download
        window.location.href = pdfEndpoint;
      } catch (error) {
        console.error('Error downloading PDF:', error.message);
      }
    };

    //Function to call api endpoint and handle file download with fetch - more robust method
    const handleDownloadWithFetch = async () => {
      try {
        const response = await fetch(pdfEndpoint);
        
        if (!response.ok) {
          throw new Error('Failed to download PDF');
        }
        //turn endpoint returned file/data into Blob(Binary Large Object))
        const blob = await response.blob();
    
        // Create a link element and trigger the download
        const url = window.URL.createObjectURL(blob);

        //Creating temporary hyperlink
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-pdf.pdf';
        document.body.appendChild(a);
        //Simulating click
        a.click();
        //Removing temporary hyperlink
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading PDF:', error.message);
      }
    };

  // Function to call the API endpoint using Axios
  const handleDownloadWithAxios = async () => {
    try {
      // Make a GET request using Axios and return pdf file as an arraybuffer(binary data)
      const response = await axios.get(pdfEndpoint, { responseType: 'arraybuffer' });

      // Check if the request was successful
      if (response.status === 200) {
        // Create a Blob from the response data and set file type
        const blob = new Blob([response.data], { type: 'application/pdf' });
         // Create url for pdf/file blob
        const url = window.URL.createObjectURL(blob);
        
        //Creating temporary hyperlink
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-pdf.pdf';
        document.body.appendChild(a);
        //Simulating click
        a.click();
        //Removing temporary hyperlink
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to fetch PDF. Status:', response.status);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error.message);
    }
  };

  return (
    <>
      <h1>My File Download App</h1>
      <div>
        <iframe title="PDF Viewer" src={pdfEndpoint+"?download=false"} style={{ width: '50%', height: '135px' }}>
          This browser does not support PDF viewing. Please download the PDF to view it.
        </iframe>
      </div>
      <Button type="primary" onClick={handleDownload}>Download PDF</Button>
      <Button type="primary" onClick={handleDownloadWithFetch}>Download PDF With Fetch</Button>
      <Button type="primary" onClick={handleDownloadWithAxios}>Download PDF With Axios</Button>
    </>
  )
}

export default App
