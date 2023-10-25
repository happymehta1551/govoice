package com.winnovate.govoice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.winnovate.govoice.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.winnovate.govoice.entity.Customer;
import com.winnovate.govoice.service.CustomerService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/customer-management")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    //Manage Customer
    @PostMapping("/customer")
    public Customer createCustomer(@RequestParam("profile_image") MultipartFile profile_image, @RequestParam String customerJsonData) {
        Customer jsonObject = null;
        try {
            // Create ObjectMapper object
            ObjectMapper objectMapper = new ObjectMapper();
            // Convert JSON string to JSON object
            jsonObject = objectMapper.readValue(customerJsonData, Customer.class);
            // Print JSON object
            System.out.println("JSON object: " + jsonObject);
            jsonObject.setProfile_image(profile_image.getBytes());
            return customerService.createCustomer(jsonObject);
        } catch (Exception e) {
            e.printStackTrace();
            return jsonObject;
        }
//        return customerService.createCustomer(post_image);
    }
    @DeleteMapping("/customer/{id}")
    public String deleteCustomer(@PathVariable int id) {
        return customerService.deleteCustomer(id);
    }
    @GetMapping("/customer/{id}")
    public Customer findCustomerById(@PathVariable int id) {
        return customerService.getCustomerById(id);
    }
    
}
