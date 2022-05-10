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

@RestController
@RequestMapping("/api")
@Slf4j
public class DetailCountController {
    @Autowired
    private DetailCountService detailCountService;


    /**
     * 查询所有数据
     * @return
     */
    /*@GetMapping
    public List<Detailcount> getAll(){

        return detailCountService.list();
    }*/

    /**
     * 按照current_confirme分页查询
     * @param currentPage
     * @param pageSize
     * @param detailcount
     * @return
     */
   /* @GetMapping("{currentPage}/{pageSize}")
    public R getPage(@PathVariable int currentPage, @PathVariable int pageSize,Detailcount detailcount){

        log.info("name:{}","detailcount:{}",detailcount);

        IPage<Detailcount> page = detailCountService.getPage(currentPage, pageSize,detailcount);

        //如果当前页码值大于总页码值，那么重新执行查询操作，使用最大页码值作为当前页码值
        if (currentPage>page.getPages()){
            page = detailCountService.getPage((int)page.getPages(),pageSize,detailcount);
        }
        return R.success(page);
    }*/

    /**
     *
     * @param page
     * @param pageSize
     * @return
     */
    //http://localhost:8089/api/today?page=1&pageSize=10
    @GetMapping("/today")
    public R<Page> page(int page, int pageSize){
        //分页构造器
        Page<Detailcount> pageInfo =new Page<>(page,pageSize);
        //条件构造器
        LambdaQueryWrapper<Detailcount> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        //添加过滤条件
        lambdaQueryWrapper.orderByDesc(Detailcount::getCurrentConfirmedCount);

        detailCountService.page(pageInfo,lambdaQueryWrapper);
        return R.success(pageInfo);

    }
//
//    @GetMapping("/province")
//    public R<List<Detailcount>> list(Detailcount detailcount){
//        //构造查询条件
//        LambdaQueryWrapper<Detailcount> queryWrapper = new LambdaQueryWrapper<>();
//
//
//
//
//    }

    @GetMapping("/{id}")
    public R<Detailcount> getById(@PathVariable Long id){
        Detailcount detailcount = detailCountService.getById(id);
        if(detailcount != null){
            return R.success(detailcount);
        }
        return R.error("没有查询到");
    }

}
