package com.winnovate.govoice.repository;

import com.winnovate.govoice.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Integer> {
//    Customer findByName(String name);
}

