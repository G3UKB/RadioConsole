#!/usr/bin/env python
#
# console.py
#
# Web application for control of radioConsole
# 
# Copyright (C) 2020 by G3UKB Bob Cowdery
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#    
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#    
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
#    
#  The author can be reached by email at:   
#     bob@bobcowdery.plus.com
#

# System imports
import os, sys
import json

# Library imports
import cherrypy

# Application imports
# The index HTML
import page
import console_model

#=====================================================
# The main application class
#===================================================== 
class Console:

    def __init__(self, name, model):
        self.__name = name
        self.__model = model
        
    # Expose the index method through the web
    @cherrypy.expose
    def index(self):
        # CherryPy will call this method for the root URI ("/") and send
        # its return value to the client.
        return page.get_page(self.__name, self.__model)

#=====================================================
# The web service classes
#=====================================================
@cherrypy.expose
class DialWebService(object):
    
    def __init__(self):
        self.__f = 7.1
        self.__lastRotation = 0
    
    @cherrypy.tools.accept(media='text/plain')
    
    #-------------------------------------------------
    # Called by a PUT request
    def PUT(self, rotation):
        #return "PUT called"
        #print("data: ", rotation)
        # Lets say KHz for testing
        rotation = int((float(rotation)))
        if rotation > self.__lastRotation:
            # Freq up
            self.__f = self.__f + 0.001
        else:
            # Freq down
            self.__f = self.__f - 0.001
        # Convert float freq to a 9 digit string.
        hz = int(self.__f * 1000000)
        s = str(hz)
        self.__lastRotation = rotation
        return (str(hz)).rjust(9, '0')
    
    #-------------------------------------------------
    # Called by a GET request
    def GET(self):
        return "GET called"

    #-------------------------------------------------
    # Called by a POST request
    def POST(self, data):
        return "POST called"
    
    #-------------------------------------------------
    # Called by a DELETE request
    def DELETE(self):
        return "DELETE called"

@cherrypy.expose
class RateWebService(object):
    
    def __init__(self):
        self.__rate = "100KHz"
        
    @cherrypy.tools.accept(media='text/plain')
    
    #-------------------------------------------------
    # Called by a PUT request
    def PUT(self, rate):
        
        print(rate)
        
#==============================================================================================
# Main code
#==============================================================================================
# Entry point

if __name__ == '__main__':
    # CherryPy always starts with app.root when trying to map request URIs
    # to objects, so we need to mount a request handler root.
            
    # Create and restore the model
    model = console_model.ConsoleModel()
    model.restore_model()
    
    # Get configuration file
    cherrypy_conf = os.path.join(os.path.dirname(__file__), 'cherrypy.conf')
    # Create web app instances
    webapp = Console('Web Console', model)
    webapp.dial_service = DialWebService()
    webapp.rate_service = RateWebService()

    # Start
    cherrypy.quickstart(webapp, config=cherrypy_conf)
        
    