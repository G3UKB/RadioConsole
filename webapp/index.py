#!/usr/bin/env python
#
# index.py
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
# Main index HTML     
def get_index(name, model):
    
    index_html = '''
    <html>
    <head>
        <link href="/static/css/console.css" rel="stylesheet">
        <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
        <script type="text/javascript">
          $(document).ready(function() {
            $("#mode_apply").click(function(e) {
              $.ajax({
                type: "PUT",
                url: "/console_service",
                data: {
                        %s
                    }
              })
              .done(function(string) {
                $("#response").val(string);
              });
              e.preventDefault();
            });
          });
        </script>
    </head>
    <body>
        <div id="container">
            <div id="header"> %s </div>
            <div id="content"> %s </div>
            <div id="update"> %s </div>
            <div id="footer"> %s </div>
        </div>
    </body>
    </html>
    ''' % (get_data(), get_header(name), get_content(model), get_update(), get_footer())
    return index_html

#==============================================================================================
# PRIVATE
#==============================================================================================

#-------------------------------------------------
# Data HTML
def get_data():     

    data = ''
    
    return data
        
#-------------------------------------------------
# Header HTML
def get_header(name):     
    return "<h1>%s</h1>" % (name)

#-------------------------------------------------
# Content HTML
def get_content(model):
    
    m = model.get_model()
    content = '''
    <table id=tmain>
        <tr>
            <th>Channel</th>
            <th id="name-col">Name</th>
            <th>Control</th>
        </tr>
    </table>
    '''
    
    return content
    
    
#-------------------------------------------------
# Updater HTML
def get_update():
    return ''' 
    <button type="button" id="console_apply">Apply</button> <input id="response" type="text" />
    '''

#-------------------------------------------------
# Footer HTML
def get_footer():
    return "Bob Cowdery - G3UKB"
