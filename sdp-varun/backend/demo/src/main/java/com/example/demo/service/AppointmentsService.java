// package com.example.demo.service;

// import com.example.demo.model.Appointments;
// import com.example.demo.repo.AppointmentsRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class AppointmentsService {

//     @Autowired
//     private AppointmentsRepository appointmentsRepository;

//     public Appointments createAppointment(Appointments appointment) {
//         return appointmentsRepository.save(appointment);
//     }

//     public List<Appointments> getAllAppointments() {
//         return appointmentsRepository.findAll();
//     }

//     public Optional<Appointments> getAppointmentById(Long id) {
//         return appointmentsRepository.findById(id);
//     }
// }
