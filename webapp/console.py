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
import queue

# Library imports
import cherrypy

# Application imports
# The index HTML
from defs import *
import page
import console_model
import cat

# Module globals
g_rate = 0.01
g_f = 7.1
g_cat_q = queue.Queue()
g_msg_q = queue.Queue()
g_cat = None

#=====================================================
# The main application class
#===================================================== 
class Console:

    def __init__(self, name, model):
        
        global g_cat_q
        global g_msg_q
        global g_cat
        
        self.__name = name
        self.__model = model
        
        # Create the cat instance
        g_cat = cat.CAT(FT817ND, CAT_PORT, BAUD, g_cat_q, g_msg_q)
        g_cat.run()
        
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
        self.__lastRotation = 0
    
    @cherrypy.tools.accept(media='text/plain')
    
    #-------------------------------------------------
    # Called by a PUT request
    def PUT(self, rotation):
        global g_rate, g_f
        #print("data: ", rotation)
        # Lets say KHz for testing
        rotation = int((float(rotation)))
        if rotation > self.__lastRotation:
            # Freq up
            g_f = g_f + g_rate
        else:
            # Freq down
            g_f = g_f - g_rate
        # Convert float freq to a 9 digit string.
        hz = int(g_f * 1000000)
        s = str(hz)
        self.__lastRotation = rotation
        # Set new frequency
        g_cat.do_command(CAT_FREQ_SET, hz)
        # Update the UI
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
        pass
        
    @cherrypy.tools.accept(media='text/plain')
    
    #-------------------------------------------------
    # Called by a PUT request
    def PUT(self, rate):
        global g_rate
        rateLookup = {"100KHz": 0.1, "10KHz": 0.01, "1KHz": 0.001, "100Hz": 0.0001, "10Hz": 0.00001,}
        g_rate = rateLookup[rate]

@cherrypy.expose
class ModeWebService(object):
    
    def __init__(self):
        pass
        
    @cherrypy.tools.accept(media='text/plain')
    
    #-------------------------------------------------
    # Called by a PUT request
    def PUT(self, mode):
        lookup = {'LSB' : MODE_LSB, 'USB' : MODE_USB, 'AM' : MODE_AM, 'FM' : MODE_FM}
        g_cat.do_command(CAT_MODE_SET, lookup[mode])

@cherrypy.expose
class BandWebService(object):
    
    def __init__(self):
        pass
        
    @cherrypy.tools.accept(media='text/plain')
    
    #-------------------------------------------------
    # Called by a PUT request
    def PUT(self, band):
        global g_f
        lookup = {
            '160m' : BAND_160,
            '80m' : BAND_80,
            '40m' : BAND_40,
            '20m' : BAND_20,
            '15m' : BAND_15,
            '10m' : BAND_10,
            '2m' : BAND_2,
            '70cm' : BAND_70
        }
        f_float = lookup[band]
        hz = int(f_float*1000000.0)
        g_f = f_float
        # Set new frequency
        g_cat.do_command(CAT_FREQ_SET, hz)
        # Update the UI
        return (str(hz)).rjust(9, '0')
              
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
    webapp.mode_service = ModeWebService()
    webapp.band_service = BandWebService()

    # Turn off logging
    access_log = cherrypy.log.access_log
    for handler in tuple(access_log.handlers):
        access_log.removeHandler(handler)
        
    # Start
    cherrypy.quickstart(webapp, config=cherrypy_conf)
        
    