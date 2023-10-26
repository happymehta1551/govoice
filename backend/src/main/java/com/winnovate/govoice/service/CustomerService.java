package com.winnovate.govoice.service;

import com.winnovate.govoice.entity.Customer;
import com.winnovate.govoice.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer getCustomerById(int id) {
        Integer cu_id = (Integer) id;
        return customerRepository.findById(cu_id).orElse("User not found"+id);
    }

    public String deleteCustomer(int id) {
        customerRepository.deleteById(id);
        return "customer removed !! " + id;
    }

}
