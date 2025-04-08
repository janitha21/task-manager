package Assignment.Trienetic.TaskManager.model;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Setter
@Getter
public class TaskModel {

    private String title;
    private String description;
    private String status;
    private LocalDateTime createdAt;
}
