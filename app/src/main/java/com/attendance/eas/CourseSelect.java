package com.attendance.eas;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class CourseSelect extends AppCompatActivity {

    String type="";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_course_select);

        Intent intType=getIntent();
        type=intType.getStringExtra("type");

        LinearLayout layout1, layout2, layout3;

        layout1=findViewById(R.id.layout1);
        layout2=findViewById(R.id.layout2);
        layout3=findViewById(R.id.layout3);

        layout1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                if(type.equals("admin")){

                    Intent intent=new Intent(getApplicationContext(), Stats.class);
                    intent.putExtra("class", "one");
                    startActivity(intent);
                }else{

                    Intent intent=new Intent(getApplicationContext(), ScanId.class);
                    intent.putExtra("class", "one");
                    startActivity(intent);
                }

            }
        });

        layout2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                if(type.equals("admin")){

                    Intent intent=new Intent(getApplicationContext(), Stats.class);
                    intent.putExtra("class", "two");
                    startActivity(intent);
                }else{

                    Intent intent=new Intent(getApplicationContext(), ScanId.class);
                    intent.putExtra("class", "two");
                    startActivity(intent);
                }


            }
        });

        layout3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(type.equals("admin")){

                    Intent intent=new Intent(getApplicationContext(), Stats.class);
                    intent.putExtra("class", "three");
                    startActivity(intent);
                }else{

                    Intent intent=new Intent(getApplicationContext(), ScanId.class);
                    intent.putExtra("class", "three");
                    startActivity(intent);
                }

            }
        });
    }
}