# -*- coding: utf-8 -*- 
import tornado.web 

class BaseHandler(tornado.web.RequestHandler):
    @property
    def db(self):
        return self.application.db


    def get_current_user(self):
        return self.get_secure_cookie("user")

