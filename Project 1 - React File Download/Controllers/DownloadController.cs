using Microsoft.AspNetCore.Mvc;

//MIME used for declaring pdf contentType header
using System.Net.Mime;

namespace Project_1___React_File_Download.Controllers
{
    
    [Route("api")]
    [ApiController]
    public class DownloadController : ControllerBase
    {
        //Specify the endpoint route
        [HttpGet("my-pdf")]
        //FromQuery parameter used to allow the option to download(true) or display(false) pdf in browser
        //True for download and false for in-browser display - default is true
        public IActionResult DownloadPdf([FromQuery] bool download = true)
        {
            // Fetch PDF file content
            byte[] pdfFileContent = GetPdfFileContent();

            //Handle missing file by returning a 404 status
            if (pdfFileContent == null || pdfFileContent.Length == 0)
            {
                return NotFound(); 
            }

            // Declaring file name and content type headers
            var fileName = "my-pdf.pdf";
            var contentType = MediaTypeNames.Application.Pdf;

            // Logic to check if serving file for download or inline display in browser
            if (download)
            {
                // Specify Content-Disposition to prompt the download
                return File(pdfFileContent, contentType, fileName);
            }
            else
            {
                //Return the file content as a response without specifying Content-Disposition
                //Allows for inline display in browser
                return File(pdfFileContent, contentType);
            }
        }

        //Method to retrieve pdf file
        private byte[] GetPdfFileContent()
        {
            //Reading the PDF file from dircetory 
            var filePath = "PdfFiles/my-pdf.pdf";

            //Only return file if it exists
            if (System.IO.File.Exists(filePath))
            {
                return System.IO.File.ReadAllBytes(filePath);
            }

            //Return null if file doesnt exist
            return null;
        }
    }
}
