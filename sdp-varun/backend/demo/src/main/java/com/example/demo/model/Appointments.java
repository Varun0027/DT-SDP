// package com.example.demo.model;

// import javax.persistence.Entity;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
// import javax.persistence.Id;
// import javax.persistence.Column;
// import java.time.LocalDate;
// import java.time.LocalTime;

// @jakarta.persistence.Entity
// public class Appointments {

//     @jakarta.persistence.Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false)
//     private LocalDate date;

//     @Column(nullable = false)
//     private LocalTime time;

//     @Column(nullable = false)
//     private String serviceType;

//     @Column(nullable = false)
//     private String mechanic;

//     // Getters and Setters
//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public LocalDate getDate() {
//         return date;
//     }

//     public void setDate(LocalDate date) {
//         this.date = date;
//     }

//     public LocalTime getTime() {
//         return time;
//     }

//     public void setTime(LocalTime time) {
//         this.time = time;
//     }

//     public String getServiceType() {
//         return serviceType;
//     }

//     public void setServiceType(String serviceType) {
//         this.serviceType = serviceType;
//     }

//     public String getMechanic() {
//         return mechanic;
//     }

//     public void setMechanic(String mechanic) {
//         this.mechanic = mechanic;
//     }
// }
