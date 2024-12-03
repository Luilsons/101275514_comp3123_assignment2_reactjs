package ca.gbc.comp3123_assignment2;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
class ApplicationTests {

    @Test
    void contextLoads() {
    }

}
