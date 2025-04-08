package Assignment.Trienetic.TaskManager.service.impl;

import Assignment.Trienetic.TaskManager.entity.UserEntity;
import Assignment.Trienetic.TaskManager.model.UserModel;
import Assignment.Trienetic.TaskManager.repository.UserRepository;
import Assignment.Trienetic.TaskManager.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;


    @Override
    public UserEntity signUser(UserModel user) {

        UserEntity existUser=userRepository.findByUserName(user.getUserName());

        if(existUser==null) {
            try {
                UserEntity userEntity = modelMapper.map(user, UserEntity.class);
                userRepository.save(userEntity);
                return userEntity;
            } catch (Exception e) {
                throw new RuntimeException("Failed to create new user", e);
            }
        }
        return null;

    }

    @Override
    public UserEntity checkValidUser(UserModel userAuth) {

        UserEntity userByUserName=userRepository.findByUserName(userAuth.getUserName());

        if(userByUserName!=null && userAuth.getPassword().equals(userByUserName.getPassword())){
            return userByUserName;

        }
        return null;
    }
}
