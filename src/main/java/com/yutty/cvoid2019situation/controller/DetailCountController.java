package com.yutty.cvoid2019situation.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;

import com.baomidou.mybatisplus.core.metadata.IPage;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yutty.cvoid2019situation.common.R;
import com.yutty.cvoid2019situation.entity.Detailcount;
import com.yutty.cvoid2019situation.service.DetailCountService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/detail")
@Slf4j
public class DetailCountController {
    @Autowired
    private DetailCountService detailCountService;


    /**
     * 查询所有数据
     * @return
     */

    @GetMapping("/page")
    public R<Page> page(Integer page, Integer pageSize ,String provinceName){
        log.info("page = {},pageSize = {},provinceName = {}" ,page,pageSize,provinceName);

        //构造分页构造器对象
        Page pageInfo = new Page(page,pageSize);

        //条件构造器
        LambdaQueryWrapper<Detailcount> queryWrapper = new LambdaQueryWrapper<>();
        //添加过滤条件
        queryWrapper.like(StringUtils.isNotEmpty(provinceName), Detailcount::getProvinceName,provinceName);
        //添加排序条件
        queryWrapper.orderByDesc(Detailcount::getDeadCount);

        //执行分页查询
        detailCountService.page(pageInfo,queryWrapper);

        return R.success(pageInfo);


    }


    @GetMapping
    public List<Detailcount> getAll(){
        return detailCountService.list();
    }

    @GetMapping("{currentPage}/{pageSize}")
    public R getPage(@PathVariable int currentPage, @PathVariable int pageSize,Detailcount detailcount){

        log.info("name:{}","detailcount:{}",detailcount);

        IPage<Detailcount> page = detailCountService.getPage(currentPage, pageSize,detailcount);
        //如果当前页码值大于总页码值，那么重新执行查询操作，使用最大页码值作为当前页码值
        if (currentPage>page.getPages()){
            page = detailCountService.getPage((int)page.getPages(),pageSize,detailcount);
        }
        return R.success(page);
    }



}
