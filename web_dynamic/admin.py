#!/usr/bin/python3
""" chat module """
from flask import redirect, Blueprint, render_template, session
admin_bp = Blueprint('admin', __name__)


@admin_bp.route('/admin')
def admin():
    """rendering the admin page"""
    if not session.get('loggedin', None):
        return redirect('/login')
    if session.get('admin'):
        return render_template('admin.html')
    if not session.get('admin'):
        return redirect('/home')
