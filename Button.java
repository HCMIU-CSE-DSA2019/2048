package com.project.gui;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.util.ArrayList;

public class Button
{
    private State currentState = State.RELEASED;
    private Rectangle box;
    private ArrayList <ActionListener> action;
    private String text = "";
    private Color pressed;
    private Color released;
    private Color hold;
    private Font font = Game.main.deriveFont(20f);
    
    public Button(int x, int y, int width, int height)
    {
        box = new Rectangle (x, y, width, height);
        action = new ArrayList <ActionListener>();
        pressed = new Color(111, 116, 117);
        released = new Color(173, 177, 179);
        hold = new Color(150, 156, 158);
    }
    
    public void update()
    {
        
    }
    
    public void render(Graphics2D gr)
    {
        if (currentState == State.PRESSED)
        {
            gr.setColor(pressed);
            gr.fill(box);
        }
        else
        {
            if (currentState == State.RELEASED)
            {
                gr.setColor(released);
                gr.fill(box);
            }
            else
            {
                gr.setColor(hold);
                gr.fill(box);               
            }
        }
        gr.setColor(Color.white);
        gr.setFont(font);
        gr.drawString(text, box.x + box.width/2 - DrawUtils.getMessageWidth(text, font, gr)/2,
                            box.y + box.height/2 + DrawUtils.getMessageHeight(text, font, gr)/2);   
    }
    
    public void addActionListener(ActionListener listener)
    {
        action.add(listener);
    }
    
    public void mousePressed(MouseEvent ev)
    {
        if (box.contains(ev.getPoint()))
            currentState = State.PRESSED;
    }
    
    public void mouseReleased(MouseEvent ev)
    {
        if (box.contains(ev.getPoint()))
            for(ActionListener act: action)
                act.actionPerformed(null);
        currentState = State.RELEASED;
    }
    
    public void mouseDragged(MouseEvent ev)
    {
        if (box.contains(ev.getPoint()))
            currentState = State.PRESSED;
        else
            currentState = State.RELEASED;
    }
    
    public void mouseMoved(MouseEvent ev)
    {
        if (box.contains(ev.getPoint()))
            currentState = State.HOLD;
        else
            currentState = State.RELEASED;
    }
    
    public int getX()
    {
        return box.x;
    }
    
    public int getY()
    {
        return box.y;
    }
    
    public int getWidth()
    {
        return box.width;
    }
    
    public int getHeight()
    {
        return box.height;
    }
    
    public void setText(String text)
    {
        this.text = text;
    }
    
    private enum State
    {
        PRESSED,
        RELEASED,
        HOLD
    }
}
