package com.yutty.cvoid2019situation.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import com.yutty.cvoid2019situation.common.R;
import com.yutty.cvoid2019situation.entity.Detailcount;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
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
     * 按当前确诊降序显示数据
     * @return
     */
    //http://localhost:8089/api/today
    @GetMapping("/today")
    public R<List<Detailcount>> list(){

        //条件构造器
        LambdaQueryWrapper<Detailcount> queryWrapper = new LambdaQueryWrapper<>();
        //添加过滤条件
        queryWrapper.orderByDesc(Detailcount::getId).last("limit 35");
        queryWrapper.orderByDesc(Detailcount::getCurrentConfirmedCount);

        return R.success(detailCountService.list(queryWrapper));

    }
    /**
     * 省内疫情数据分页查询
     * @param page
     * @param pageSize
     * @param name
     * @return
     */
    //http://localhost:8089/api/province?page=1&pageSize=10&name=福建
    @GetMapping("/province")
    public R<Page> getByName(int page,int pageSize,String name){
        //构建查询条件，根据name查询
        LambdaQueryWrapper<Detailcount> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.like(name!=null,Detailcount::getProvinceName,name);
        Page<Detailcount> pageInfo = new Page<>(page,pageSize);
        //根据更新时间降序排序
        queryWrapper.orderByDesc(Detailcount::getId);

        detailCountService.page(pageInfo,queryWrapper);
        return R.success(pageInfo);
    }

}
