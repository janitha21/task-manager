package Assignment.Trienetic.TaskManager.controller;

import Assignment.Trienetic.TaskManager.entity.TaskEntity;
import Assignment.Trienetic.TaskManager.model.TaskModel;
import Assignment.Trienetic.TaskManager.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@AllArgsConstructor
@RequestMapping("/task")
public class TaskController {

    private final TaskService taskService;

    //------create new task----
    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<TaskModel> createNewTask(@RequestBody TaskModel task, @RequestParam Long userId ){

      return  ResponseEntity.ok(taskService.createNewTask(task,userId));
    }

    //----get all tasks-----
    @CrossOrigin
    @GetMapping("/get-all")
    public  List<TaskEntity> getAllTasks(@RequestParam Long userId){

        return taskService.getAllTasks(userId);

    }

    //----update task---------
    @CrossOrigin
    @PostMapping("/update")
    public ResponseEntity<Map<String, String>> updateTask(@RequestBody TaskModel task, @RequestParam Long taskId){

        TaskModel updatedTask=taskService.updateTask(task,taskId);
        Map<String, String> response = new HashMap<>();

        if (updatedTask != null) {
            response.put("message", "Task updated successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Task not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }



    }

    //----get task by taskId--------
    @GetMapping("/get-by-id")
    public TaskEntity getTaskById(@RequestParam Long taskId){
        return taskService.getTaskById(taskId);
    }

    //------delete task---------------
    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<Map<String, String>> deleteTask(@PathVariable Long taskId) {
        boolean isDeleted = taskService.deleteTaskById(taskId);
        Map<String, String> response = new HashMap<>();

        if (isDeleted) {
            response.put("message", "Task deleted successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Task not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }




}
