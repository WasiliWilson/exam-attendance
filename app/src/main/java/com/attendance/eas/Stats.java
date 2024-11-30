package com.attendance.eas;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import org.w3c.dom.Text;

public class Stats extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_stats);

        TextView faculty=findViewById(R.id.faculty_school_value);
        TextView department=findViewById(R.id.department_value);
        TextView course=findViewById(R.id.course_name_value);
        TextView code=findViewById(R.id.course_code_value);
        TextView students=findViewById(R.id.students_enrolled_value);
        TextView attended=findViewById(R.id.attended_value);

        Intent intent=getIntent();
        String classes=intent.getStringExtra("class");

        if(classes.equals("one")){

            course.setText("SOFTWARE ENGINEERING");
            code.setText("COM 311");
            students.setText("34");
            attended.setText("29");
        }else if(classes.equals("two")){
            course.setText("DATA STRUCTURE AND ALGORITHM");
            code.setText("COM 314");
            students.setText("20");
            attended.setText("20");

        }else if(classes.equals("three")){
            course.setText("COMPUTER SECURITY");
            code.setText("COM 313");
            students.setText("35");
            attended.setText("33");

        }


    }
}