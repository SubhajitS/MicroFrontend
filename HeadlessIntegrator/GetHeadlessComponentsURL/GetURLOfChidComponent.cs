using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Cosmos.Table;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;

namespace GetHeadlessComponentsURL
{
    public static class GetURLOfChidComponent
    {
        [FunctionName("GetURLOfChidComponent")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string parentAppID = req.Query["parentAppID"];
            var requiredDetails = GetApplicationSpecificDetails(parentAppID);
            var blobEndPoint = requiredDetails.ToList()[0].Properties["blobendpoint"].StringValue;
            var container = requiredDetails.ToList()[0].Properties["container"].StringValue;
            var fileToRead = requiredDetails.ToList()[0].Properties["metadatafile"].StringValue;
            var directive = requiredDetails.ToList()[0].Properties["renderertag"].StringValue;

            var content = GetFileContent(blobEndPoint, container, fileToRead);
            var finalResponse = prepareResponse(content, blobEndPoint + "/" + container, directive);

            return parentAppID != null
                ? (ActionResult)new OkObjectResult(finalResponse)
                : new BadRequestObjectResult("Please pass the app id");
        }

        private static JObject prepareResponse(JObject content,string urlToAppend,string directive)
        {
            foreach (var prop in content.Properties())
            {
                content[prop.Name.ToString()] = urlToAppend + "/" + content[prop.Name.ToString()];
            }
            content.Add("directive", directive);
            return content;
        }

        private static JObject GetFileContent(string blobEndPoint, string container, string fileToRead)
        {
            JObject filecontent = null;
            BlobClient client = new BlobClient(new Uri(blobEndPoint + "/" + container + "/" + fileToRead));
            if (client.Exists())
            {
                var downLoadInfo = client.Download().Value;
                int blockLength = 1048576;
                using (MemoryStream ms = new MemoryStream())
                {
                    byte[] content = new byte[blockLength];
                    int read = 0;
                    while ((read = downLoadInfo.Content.Read(content, 0, content.Length)) > 0)
                    {
                        ms.Write(content, 0, read);
                    }
                    filecontent = JObject.Parse(Encoding.ASCII.GetString(ms.ToArray()));
                }
            }
            return filecontent;
        }

        private static  IEnumerable<DynamicTableEntity> GetApplicationSpecificDetails(string parentAppID)
        {
            string storageConn = Environment.GetEnvironmentVariable("AzureWebJobsStorage", EnvironmentVariableTarget.Process);
            var sta = CloudStorageAccount.Parse(storageConn);
            var tableClient = sta.CreateCloudTableClient();
            //
            var componentOrchestratorMasterTable = tableClient.GetTableReference("ComponentOrchestratorMaster");
            var query = new TableQuery().Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, parentAppID));
            //            
            var queryResult = componentOrchestratorMasterTable.ExecuteQuery(query);
            return queryResult;
        }
    }
}
