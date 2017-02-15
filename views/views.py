# -*- coding: utf-8 -*-
from  base import BaseHandler


class INDEX_Handler(BaseHandler):
    def get(self):
        print self.request.arguments
        define_dict = dict (
             woxiu = '我秀',
             fengyu = '风云',
             inke = '映客',
             qixiu = '奇秀',
             zhanqi = '战旗',
             huomao = '火猫',
             douyu = '斗鱼',
             huya = '虎牙',
             xiongmao = '熊猫',
             longzhu = '龙珠',
             xiaomi = '小米',
             momo = '陌陌',
             mangguo = '芒果',
             meibo = '美博',
             tengxun = '腾讯',
             shuijing = '水晶',
             jiuyou = '九游',
             liujianfang = '六间房',

            )
        _dict = {'define_dict':define_dict}

        self.render("index.html",**_dict)
        


