package com.yutty.cvoid2019situation.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import com.yutty.cvoid2019situation.common.R;
import com.yutty.cvoid2019situation.entity.Detailcount;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yutty.cvoid2019situation.service.DetailCountService;

import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class DetailCountController {
    @Autowired
    private DetailCountService detailCountService;



    /**
     * 按降序显示数据
     * @return
     */
    //http://localhost:8089/api/today?page=1&pageSize=10
    @GetMapping("/today")
    public R<List<Detailcount>> list(){

        //条件构造器
        LambdaQueryWrapper<Detailcount> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        //添加过滤条件
        lambdaQueryWrapper.orderByDesc(Detailcount::getCurrentConfirmedCount);


        return R.success(detailCountService.list(lambdaQueryWrapper));

    }



    @GetMapping("/{id}")
    public R<Detailcount> getById(@PathVariable Long id){
        Detailcount detailcount = detailCountService.getById(id);
        if(detailcount != null){
            return R.success(detailcount);
        }
        return R.error("没有查询到");
    }

}
