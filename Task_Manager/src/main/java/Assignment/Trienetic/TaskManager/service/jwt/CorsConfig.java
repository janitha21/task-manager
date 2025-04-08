package Assignment.Trienetic.TaskManager.service.jwt;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // allow all paths
                .allowedOrigins("http://localhost:4200") // allow Angular dev server
                .allowedMethods("*") // GET, POST, PUT, DELETE etc.
                .allowedHeaders("*") // all headers
                .allowCredentials(true); // allow cookies and Authorization headers
    }
}

