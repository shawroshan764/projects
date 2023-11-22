package com.crick.apis.services;

import com.crick.apis.entities.Match;

import java.util.List;
import java.util.Map;

public interface MatchService {
    // Get all matches
    List<Match> getAllMatches();






    // Get LIVE matches
    List<Match> getLiveMatches();

    //Get cricket world cup point table
    List<List<String>> getPointTable();


}
