package com.attendance.eas;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.ArrayList;

public class CustomAdapter extends BaseAdapter {

    private Context context;
    private ArrayList<String[]> dataList;

    public CustomAdapter(Context context, ArrayList<String[]> dataList) {
        this.context = context;
        this.dataList = dataList;
    }

    @Override
    public int getCount() {
        return dataList.size();
    }

    @Override
    public Object getItem(int position) {
        return dataList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Reuse views for better performance
        if (convertView == null) {
            convertView = LayoutInflater.from(context).inflate(R.layout.list_item, parent, false);
        }

        // Get references to the TextViews
        TextView idTextView = convertView.findViewById(R.id.idTextView);
        TextView statusTextView = convertView.findViewById(R.id.statusTextView);

        // Get the current data
        String[] data = dataList.get(position);

        // Set the values
        idTextView.setText(data[0]);
        statusTextView.setText(data[1]);

        return convertView;
    }
}
