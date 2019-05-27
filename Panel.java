package com.project.gui;

import java.awt.Graphics2D;
import java.awt.event.MouseEvent;
import java.util.ArrayList;

public class Panel
{
    private ArrayList<Button> buttons;
    
    public Panel()
    {
        buttons = new ArrayList<Button>();
    }
    
    public void update()
    {
        for (Button b: buttons)
            b.update();
    }
    
    public void render(Graphics2D gr)
    {
        for (Button b: buttons)
            b.render(gr);        
    }
    
    public void add(Button button)
    {
        buttons.add(button);
    }
    
    public void remove(Button button)
    {
        buttons.remove(button);
    }  
    
    public void mousePressed(MouseEvent ev)
    {
        for (Button b: buttons)
            b.mousePressed(ev);
    }
    
    public void mouseReleased(MouseEvent ev)
    {
        for (Button b: buttons)
            b.mouseReleased(ev);
    }
    
    public void mouseDragged(MouseEvent ev)
    {
        for (Button b: buttons)
            b.mouseDragged(ev);
    }
    
    public void mouseMoved(MouseEvent ev)
    {
        for (Button b: buttons)
            b.mouseMoved(ev);
    }
}
