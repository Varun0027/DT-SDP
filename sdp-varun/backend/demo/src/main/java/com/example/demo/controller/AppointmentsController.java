// package com.example.demo.controller;

// import com.example.demo.model.Appointments;
// import com.example.demo.service.AppointmentsService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;

// @RestController
// @RequestMapping("/api/appointments")
// public class AppointmentsController {

//     @Autowired
//     private AppointmentsService appointmentsService;

//     @PostMapping
//     public ResponseEntity<Appointments> createAppointment(@RequestBody Appointments appointment) {
//         Appointments createdAppointment = appointmentsService.createAppointment(appointment);
//         return new ResponseEntity<>(createdAppointment, HttpStatus.CREATED);
//     }

//     @GetMapping
//     public ResponseEntity<List<Appointments>> getAllAppointments() {
//         List<Appointments> appointments = appointmentsService.getAllAppointments();
//         return new ResponseEntity<>(appointments, HttpStatus.OK);
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Appointments> getAppointmentById(@PathVariable Long id) {
//         Optional<Appointments> appointment = appointmentsService.getAppointmentById(id);
//         return appointment.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
//     }
// }
