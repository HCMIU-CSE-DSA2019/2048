package com.project.gui;

import java.awt.Graphics2D;
import java.awt.event.MouseEvent;
import java.util.HashMap;

public class Screen {
    private static Screen screen;
    private HashMap <String, Panel> panels;
    private String currentPanel = "";
    
    private Screen()
    {
        panels = new HashMap <String, Panel>();
    }
    
    public static Screen getInstance()
    {
        if (screen = null)
            screen = new Screen();
        return screen;
    }
    
    public void update()
    {
        if (panels.get(currentPanel) != null)
            panels.get(currentPanel).update();
    }
    
    public void render(Graphics2D gr)
    {
        if (panels.get(currentPanel) != null)
            panels.get(currentPanel).render(gr);
    }
    
    public void add(String panelName, Panel panel)
    {
        panels.put(panelName, panel);
    }

    public void setCurrentPanel(String panelName)
    {
        currentPanel = panelName;
    }
    
    public void mousePressed(MouseEvent ev)
    {
        if (panels.get(currentPanel) != null)
            panels.get(currentPanel).mousePressed(ev);
    }
    
    public void mouseReleased(MouseEvent ev)
    {
        if (panels.get(currentPanel) != null)
            panels.get(currentPanel).mouseReleased(ev);
    }
    
    public void mouseDragged(MouseEvent ev)
    {
        if (panels.get(currentPanel) != null)
            panels.get(currentPanel).mouseDragged(ev);
    }
    
    public void mouseMoved(MouseEvent ev)
    {
        if (panels.get(currentPanel) != null)
            panels.get(currentPanel).mouseMoved(ev);
    }
}
