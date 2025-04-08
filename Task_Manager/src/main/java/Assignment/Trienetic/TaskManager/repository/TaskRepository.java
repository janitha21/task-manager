package Assignment.Trienetic.TaskManager.repository;

import Assignment.Trienetic.TaskManager.entity.TaskEntity;
import Assignment.Trienetic.TaskManager.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<TaskEntity,Long> {


    List<TaskEntity> findAllByUser(UserEntity user);
}
