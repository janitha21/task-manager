package Assignment.Trienetic.TaskManager.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@Entity(name = "task")
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    private String title;
    private String description;
    private String status;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private UserEntity user;


}
