package Assignment.Trienetic.TaskManager.service;

import Assignment.Trienetic.TaskManager.entity.TaskEntity;
import Assignment.Trienetic.TaskManager.model.TaskModel;

import java.util.List;

public interface TaskService {
    TaskModel createNewTask(TaskModel task,Long userId);

    List<TaskEntity> getAllTasks(Long userId);

    TaskModel updateTask(TaskModel task,Long taskId);

    TaskEntity getTaskById(Long taskId);

    boolean deleteTaskById(Long taskId);
}
