using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;
using System.Net;
namespace customer_app.Controllers
{
public class CustomerController : Controller
    {

        [HttpGet]
        [Route("api/Customer")]
        public async Task<IEnumerable<CustomerModel>> Get()
        {
            List<CustomerModel> customerList = new List<CustomerModel>();
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync("https://getinvoices.azurewebsites.net/api/Customers"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    customerList = JsonSerializer.Deserialize<List<CustomerModel>>(apiResponse);
                }
            }
            return customerList.OrderBy(x=>x.id);
        }

[HttpGet]
        [Route("api/Customer/{id}")]
        public async Task<IEnumerable<CustomerModel>> Get(string id)
        {
            List<CustomerModel> customerList = new List<CustomerModel>();
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync($"https://getinvoices.azurewebsites.net/api/Customers/{id}"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    customerList = JsonSerializer.Deserialize<List<CustomerModel>>(apiResponse);
                }
            }
            return customerList.OrderBy(x=>x.id);
        }

        [HttpPost]
        [Route("api/Customer/Create")]
        public async Task<CustomerModel> Create(CustomerModel customer)
        {
            var url = "https://getinvoices.azurewebsites.net/api/Customer";
            using var client = new HttpClient();
            var json = JsonSerializer.Serialize(customer);
            var data = new StringContent(json, Encoding.UTF8, "application/json");   
            var response = await client.PostAsync(url, data);
            var result = await response.Content.ReadAsStringAsync();
           return JsonSerializer.Deserialize<CustomerModel>(result);
             
        }   

        // [HttpGet]
        // [Route("api/Employee/Details/{id}")]
        // public TblEmployee Details(int id)
        // {
        //     return objemployee.GetEmployeeData(id);
        // }

        [HttpPut]
        [Route("api/Customer/Edit")]
        public async Task<CustomerModel> Edit(string id, CustomerModel customer)
        {
             var url = string.Format("https://getinvoices.azurewebsites.net/api/Customer/{0}",id);
            using var client = new HttpClient();
            var json = JsonSerializer.Serialize(customer);
            var data = new StringContent(json, Encoding.UTF8, "application/json");   
            var response = await client.PostAsync(url, data);
            var result = await response.Content.ReadAsStringAsync();
           return JsonSerializer.Deserialize<CustomerModel>(result);
        }

        [HttpDelete]
        [Route("api/Customer/Delete/{id}")]
        public async Task<CustomerModel> Delete(string id)
        {
           var url = string.Format("https://getinvoices.azurewebsites.net/api/Customer/{0}",id);
            using var client = new HttpClient();
            var response = await client.DeleteAsync(url);
            var result = await response.Content.ReadAsStringAsync();
           return JsonSerializer.Deserialize<CustomerModel>(result);
        }

        // [HttpGet]
        // [Route("api/Employee/GetCityList")]
        // public IEnumerable<TblCities> Details()
        // {
        //     return objemployee.GetCities();
        // }

        // private HttpClient GetHttpClient()
        // {
        //  HttpClient client = new HttpClient();


        }
    }

