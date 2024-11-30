package com.attendance.eas;

import android.os.Bundle;
import android.widget.ListView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.util.ArrayList;
import java.util.HashSet;

public class Attendace extends AppCompatActivity {


    private ListView listView;
    private DatabaseHelpertwo db;
    private CustomAdapter customAdapter;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_attendace);

        listView = findViewById(R.id.listView);
        db = new DatabaseHelpertwo(this);

        // Get data from the database
        ArrayList<String[]> dataList = db.getData();


        ArrayList<String[]> store = filterUniqueEntries(dataList);
        // Set up the custom adapter
        customAdapter = new CustomAdapter(this, store);
        listView.setAdapter(customAdapter);

    }

    private ArrayList<String[]> filterUniqueEntries(ArrayList<String[]> dataList) {
        ArrayList<String[]> store = new ArrayList<>();
        HashSet<String> uniqueIds = new HashSet<>();

        for (String[] data : dataList) {
            String id = data[0]; // Extract the ID
            if (!uniqueIds.contains(id)) {
                uniqueIds.add(id); // Mark this ID as processed
                store.add(data);   // Add this entry to the store
            }
        }
        return store;
    }
}