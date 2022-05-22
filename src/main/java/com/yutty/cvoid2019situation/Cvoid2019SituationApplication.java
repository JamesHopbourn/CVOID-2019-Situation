package com.yutty.cvoid2019situation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

import java.io.IOException;

@Slf4j
@SpringBootApplication
@ServletComponentScan
public class Cvoid2019SituationApplication {
    public static void main(String[] args) {
        SpringApplication.run(Cvoid2019SituationApplication.class, args);
        log.info("项目启动成功...");
        browse("http://localhost:8089/index.html");
    }

    public static void browse(String url) {
        String osName = System.getProperty("os.name");
        Runtime runtime = Runtime.getRuntime();
        try {
            if (osName.startsWith("Mac OS")) {
                runtime.exec("open " + url);
            } else if (osName.startsWith("Windows")) {
                runtime.exec("rundll32 url.dll,FileProtocolHandler " + url);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
