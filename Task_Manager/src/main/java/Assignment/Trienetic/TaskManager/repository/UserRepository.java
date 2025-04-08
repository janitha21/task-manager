package Assignment.Trienetic.TaskManager.repository;

import Assignment.Trienetic.TaskManager.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByUserName(String userName);
}
