#!/usr/bin/env python
#
# defs.py
#
# Minimal (extensible) CAT control for FT817 and IC7100
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

# ============================================================================
# CAT

CAT_PORT = '/dev/ttyUSB0'
#CAT_PORT = 'COM3'
BAUD = 9600

# CAT variants
FT817ND = 'FT-817ND'
IC7100 = 'IC7100'
CAT_VARIANTS = [FT817ND, IC7100]
YAESU = 'YAESU'
ICOM = 'ICOM'

# ============================================================================
# Constants used in command sets
REFERENCE = 'reference'
MAP = 'map'
CLASS = 'rigclass'
SERIAL = 'serial'
COMMANDS = 'commands'
MODES = 'modes'
PARITY = 'parity'
STOP_BITS = 'stopbits'
TIMEOUT = 'timeout'
READ_SZ = 'readsz'
LOCK_CMD = 'lockcmd'
LOCK_SUB = 'locksub'
LOCK_ON = 'lockon'
LOCK_OFF = 'lockoff'
TRANCEIVE_STATUS_CMD = 'tranceivestatuscmd'
TRANCEIVE_STATUS_SUB = 'tranceivestatussub'
PTT_ON = 'ptton'
PTT_OFF = 'pttoff'
TX_STATUS = 'txstatus'
SET_FREQ_CMD = 'setfreqcmd'
SET_FREQ_SUB = 'setfreqsub'
SET_FREQ = 'setfreq'
SET_MODE_CMD = 'setmodecmd'
SET_MODE_SUB = 'setmodesub'
SET_MODE = 'setmode'
GET_FREQ_CMD = 'getfreqcmd'
GET_FREQ_SUB = 'getfreqsub'
GET_MODE_CMD = 'getmodecmd'
GET_MODE_SUB = 'getmodesub'
FREQ_MODE_GET = 'freqmodeget'
RESPONSES = 'responses'

ACK = 'ack'
NAK = 'nak'

# ============================================================================
# Constants used in command sets and to be used by callers for mode changes
MODE_LSB = 'lsb'
MODE_USB = 'usb'
MODE_CW = 'cw'
MODE_CWR = 'cwr'
MODE_AM = 'am'
MODE_FM = 'fm'
MODE_DIG = 'dig'
MODE_PKT = 'pkt'
MODE_RTTY = 'rtty'
MODE_RTTYR = 'rttyr'
MODE_WFM = 'wfm'
MODE_DV = 'dv'

# ============================================================================
# Band default frequency
BAND_160 = 1.91
BAND_80 = 3.69
BAND_40 = 7.09
BAND_20 = 14.285
BAND_15 = 21.285
BAND_10 = 28.635
BAND_2 = 144.285
BAND_70 = 430.0


# ============================================================================
# CAT command set to be used by callers
CAT_LOCK = 'catlock'
CAT_PTT = 'catptt'
CAT_PTT_SET = 'catpttset'
CAT_PTT_GET = 'catpttget'
CAT_FREQ_SET = 'catfreqset'
CAT_MODE_SET = 'catmodeset'
CAT_FREQ_GET = 'catfreqget'
CAT_MODE_GET = 'catmodeget'
