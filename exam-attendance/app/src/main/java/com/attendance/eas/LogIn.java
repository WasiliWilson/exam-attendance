package com.attendance.eas;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import org.w3c.dom.Text;

import java.util.ArrayList;

public class LogIn extends AppCompatActivity {


    DatabaseHelper db;
    Boolean state=false;
    String types="";

    TypeStore typeStore;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_in);

        typeStore=new TypeStore();
        db = new DatabaseHelper(this);

        TextView logIn=findViewById(R.id.btn_login);
        TextView signUp=findViewById(R.id.btn_signup);
        EditText username=findViewById(R.id.et_username);
        EditText password=findViewById(R.id.et_password);
        RelativeLayout type=findViewById(R.id.select_type);
        TextView invigilator=findViewById(R.id.invigilator);
        TextView stuff=findViewById(R.id.stuff);
        TextView selecttype=findViewById(R.id.tv_select_type);
        TextView warning=findViewById(R.id.warning);

        type.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(state){

                    invigilator.setVisibility(View.GONE);
                    stuff.setVisibility(View.GONE);
                    state=false;
                }else{

                    invigilator.setVisibility(View.VISIBLE);
                    stuff.setVisibility(View.VISIBLE);
                    state=true;
                }

            }
        });

        invigilator.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                types="invigilator";
                selecttype.setText(types);

                typeStore.set(types);
                invigilator.setVisibility(View.GONE);
                stuff.setVisibility(View.GONE);

            }
        });

        stuff.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                types="admin";
                selecttype.setText(types);

                typeStore.set(types);
                invigilator.setVisibility(View.GONE);
                stuff.setVisibility(View.GONE);

            }

        });

        logIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                ArrayList<String> data=db.getData();
                String cl=username.getText().toString()+"//"+password.getText().toString();

                boolean found=false;

                //check if username and password are empty

                if(!username.getText().toString().equals("") && !password.getText().toString().equals("")){

                    for(String s:data){
                        if(cl.equals(s)){
                            found=true;
                            if(types.equals("admin")){

                                startActivity(new Intent(getApplicationContext(), Menu.class));
                            }else if(types.equals("invigilator")){

                                Intent intent=new Intent(getApplicationContext(), CourseSelect.class);
                                intent.putExtra("type", "invigilator");
                                startActivity(intent);
                            }else{

                                warning.setVisibility(View.VISIBLE);
                                warning.setText("select type");
                            }
                        }
                    }
                }

                if(!found){

                    warning.setVisibility(View.VISIBLE);
                }
            }
        });

        signUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(getApplicationContext(), SignUp.class));
            }
        });
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        //i want to exit the app when i back press
        finish();


    }
}