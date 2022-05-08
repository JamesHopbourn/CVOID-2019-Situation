package com.yutty.cvoid2019situation.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yutty.cvoid2019situation.entity.Detailcount;

public interface DetailCountService extends IService<Detailcount> {

    IPage<Detailcount> getPage(int currentPage, int pageSize, Detailcount detailcount);


}
