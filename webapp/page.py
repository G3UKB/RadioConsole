#!/usr/bin/env python
#
# page.py
#
# The one and only HTML page
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
import pickle

# Library imports

# Application imports

#==============================================================================================
# PUBLIC
#==============================================================================================
 
#-------------------------------------------------
# Get the one and only page     
def get_page(name, model):
    
    index_html = '''
    <html>
    <head>
        <link href="/static/css/page.css" rel="stylesheet">
        <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
        <script type="text/javascript" src="/static/js/jogDial.js"></script>
        <script type="text/javascript" src="/static/js/console.js"></script>
    </head>
    <body>
        <div id="container">
            <div id="header"> %s </div>
            <div id="dial"></div>
            <div id="content"> %s </div>
            <div id="footer"> %s </div>
        </div>
    </body>
    </html>
    ''' % (get_header(name), get_content(model), get_footer())
    return index_html

#==============================================================================================
# PRIVATE
#==============================================================================================
        
#-------------------------------------------------
# Header HTML
def get_header(name):     
    return "<h1>%s</h1>" % (name)

#-------------------------------------------------
# Content HTML
def get_content(model):
    
    m = model.get_model()
    content = ''' 
    <p>
    <label id="MHz100" class="MHz">0</label>
    <label id="MHz10" class="MHz">0</label>
    <label id="MHz1" class="MHz">0</label>
    <label id="Sep1" class="Sep">.</label>
    <label id="KHz100" class="KHz">0</label>
    <label id="KHz10" class="KHz">0</label>
    <label id="KHz1" class="KHz">0</label>
    <label id="Sep2" class="Sep">.</label>
    <label id="Hz100" class="Hz">0</label>
    <label id="Hz10" class="Hz">0</label>
    <label id="Hz1" class="Hz">0</label>
    </p>
    '''
    
    return content
    
#-------------------------------------------------
# Footer HTML
def get_footer():
    return "Bob Cowdery - G3UKB"
