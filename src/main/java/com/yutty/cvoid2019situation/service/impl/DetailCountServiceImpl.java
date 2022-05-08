package com.yutty.cvoid2019situation.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yutty.cvoid2019situation.entity.Detailcount;
import com.yutty.cvoid2019situation.mapper.DetailCountMapper;
import com.yutty.cvoid2019situation.service.DetailCountService;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class DetailCountServiceImpl extends ServiceImpl<DetailCountMapper, Detailcount>implements DetailCountService {
    @Autowired
    private DetailCountMapper detailCountMapper;

    @Override
    public IPage<Detailcount> getPage(int currentPage, int pageSize, Detailcount detailcount) {
        LambdaQueryWrapper<Detailcount> lambdaQueryWrapper = new LambdaQueryWrapper<Detailcount>();
        lambdaQueryWrapper.like(Strings.isNotEmpty(detailcount.getProvinceName()),Detailcount::getProvinceName,detailcount.getProvinceName());
        lambdaQueryWrapper.like(Detailcount::getCuredCount,detailcount.getCuredCount());

        IPage page = new Page(currentPage,pageSize);
        detailCountMapper.selectPage(page,null);
        return page;
    }
}
