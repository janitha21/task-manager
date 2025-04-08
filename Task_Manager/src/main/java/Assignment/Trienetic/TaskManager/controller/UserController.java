package Assignment.Trienetic.TaskManager.controller;

import Assignment.Trienetic.TaskManager.entity.UserEntity;
import Assignment.Trienetic.TaskManager.model.UserModel;
import Assignment.Trienetic.TaskManager.service.UserService;
import Assignment.Trienetic.TaskManager.service.jwt.AuthResponse;
import Assignment.Trienetic.TaskManager.service.jwt.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    //-----sign-in----
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/sign")
    public ResponseEntity<Map<String, String>> signUser(@RequestBody UserModel user){

        UserEntity savedUser= userService.signUser(user);
        Map<String, String> response = new HashMap<>();

        if(savedUser!=null){

            response.put("message", "Signed up successfully!");
            return ResponseEntity.ok(response);
        }

        else{
            response.put("message", "User Name exists... try another.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    //------log-in----------
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/log-in")
    public ResponseEntity<?> logIn(@RequestBody UserModel userAuth){

        System.out.println(userAuth);
        UserEntity validUser=userService.checkValidUser(userAuth);

       if(validUser!=null){
           String token = jwtUtil.generateToken(validUser.getUserName(),validUser.getUserId());
           return ResponseEntity.ok(new AuthResponse(token));
       }

       else{
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");

       }

    }
}
