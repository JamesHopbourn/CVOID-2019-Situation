package com.yutty.cvoid2019situation.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import com.yutty.cvoid2019situation.common.R;
import com.yutty.cvoid2019situation.entity.Detailcount;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yutty.cvoid2019situation.service.DetailCountService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class DetailCountController {
    @Autowired
    private DetailCountService detailCountService;

    /**
     * 显示当天的数据，并根当前确诊数量降序排序
     * @return
     */
    //http://localhost:8089/api/today
    @GetMapping("/today")
    public R<List<Detailcount>> CurrentConfirmedCount(){
        LambdaQueryWrapper<Detailcount> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByDesc(Detailcount::getDate,Detailcount::getCurrentConfirmedCount).last("limit 34");
        return R.success(detailCountService.list(queryWrapper));
    }
    /**
     * 根据确诊总数降序排序
     * @return
     */
    //http://localhost:8089/api/count
    @GetMapping("/count")
    public R<List<Detailcount>> ConfirmedCount(){
        LambdaQueryWrapper<Detailcount> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByDesc(Detailcount::getDate,Detailcount::getConfirmedCount).last("limit 35");
        return R.success(detailCountService.list(queryWrapper));

    }

    /**
     * 根据死亡总数降序排序
     * @return
     */
    //http://localhost:8089/api/dead
    @GetMapping("/dead")
    public R<List<Detailcount>> DeadCount(){
        LambdaQueryWrapper<Detailcount> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByDesc(Detailcount::getDate,Detailcount::getDeadCount).last("limit 34");
        return R.success(detailCountService.list(queryWrapper));

    }

    /**
     * 根据治愈总数降序排序
     * @return
     */
    //http://localhost:8089/api/cured
    @GetMapping("/cured")
    public R<List<Detailcount>> CuredCount(){
        LambdaQueryWrapper<Detailcount> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByDesc(Detailcount::getDate,Detailcount::getCuredCount).last("limit 34");
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
        //构建查询条件，根据name查询,并根据id降序排序
        LambdaQueryWrapper<Detailcount> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.like(name!=null,Detailcount::getProvinceName,name);
        queryWrapper.orderByDesc(Detailcount::getId);

        Page<Detailcount> pageInfo = new Page<>(page,pageSize);
        detailCountService.page(pageInfo,queryWrapper);
        return R.success(pageInfo);
    }

}
