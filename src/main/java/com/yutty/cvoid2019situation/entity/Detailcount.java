package com.yutty.cvoid2019situation.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class Detailcount implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;

    private String provinceName;

    private Integer currentConfirmedCount;

    private Integer confirmedCount;

    private Integer deadCount;

    private Integer curedCount;

}
