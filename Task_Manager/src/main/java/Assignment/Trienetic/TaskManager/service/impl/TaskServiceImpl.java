package Assignment.Trienetic.TaskManager.service.impl;

import Assignment.Trienetic.TaskManager.entity.TaskEntity;
import Assignment.Trienetic.TaskManager.entity.UserEntity;
import Assignment.Trienetic.TaskManager.model.TaskModel;
import Assignment.Trienetic.TaskManager.repository.TaskRepository;
import Assignment.Trienetic.TaskManager.repository.UserRepository;
import Assignment.Trienetic.TaskManager.service.TaskService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;


    //----create new task----
    @Override
    public TaskModel createNewTask(TaskModel task, Long userId) {

     UserEntity userById = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));;

     if(userById!=null) {

         try {

             TaskEntity taskEntity = modelMapper.map(task, TaskEntity.class);
             taskEntity.setUser(userById);
             taskRepository.save(taskEntity);
             System.out.println(taskEntity);
             return task;

         } catch (Exception e) {

             System.err.println("Error creating task: " + e.getMessage());
             throw new RuntimeException("Failed to create new task", e);
         }
     }
     return null;

    }


    //----get all tasks----
    @Override
    public List<TaskEntity> getAllTasks(Long userId) {

        UserEntity user = userRepository.findById(userId).orElse(null);

        if(user!=null) {

            return taskRepository.findAllByUser(user);

        }
        return null;

    }

    //----update task-------
    @Override
    public TaskModel updateTask(TaskModel task,Long taskId) {

        TaskEntity updatingTask = taskRepository.findById(taskId).orElse(null);

        if(updatingTask!=null){
         try {
             updatingTask.setStatus(task.getStatus());
             updatingTask.setTitle(task.getTitle());
             updatingTask.setDescription(task.getDescription());

             taskRepository.save(updatingTask);
             return modelMapper.map(updatingTask, TaskModel.class);
         }
         catch (Exception e) {

             System.err.println("Error creating task: " + e.getMessage());
             throw new RuntimeException("Failed to update task", e);
         }
        }

        return null;
    }

    //----get task by id-------
    @Override
    public TaskEntity getTaskById(Long taskId) {
        TaskEntity taskEntity = taskRepository.findById(taskId).orElse(null);

        if(taskEntity!=null){
            return taskEntity;

        }
        return null;
    }

    @Override
    public boolean deleteTaskById(Long taskId) {
        Optional<TaskEntity> task = taskRepository.findById(taskId);
        if (task.isPresent()) {
            taskRepository.deleteById(taskId);
            return true;
        }
        return false;
    }
}
