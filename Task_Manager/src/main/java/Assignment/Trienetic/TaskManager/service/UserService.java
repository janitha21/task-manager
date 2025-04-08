package Assignment.Trienetic.TaskManager.service;

import Assignment.Trienetic.TaskManager.entity.UserEntity;
import Assignment.Trienetic.TaskManager.model.UserModel;

public interface UserService {
    UserEntity signUser(UserModel user);

    UserEntity checkValidUser(UserModel userAuth);

}
