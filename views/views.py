# -*- coding: utf-8 -*-
from  base import BaseHandler


class INDEX_Handler(BaseHandler):
    def get(self):
        z_list = ['我秀','风云','映客','奇秀','战旗','火猫','斗鱼', '虎牙','熊猫','龙珠','小米','陌陌','芒果','美播','腾讯','水晶','九游','六间房']
        _dict = {'z_list': z_list }
        self.render("index.html",**_dict)
        


